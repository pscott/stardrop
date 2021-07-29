import './myStyles.scss';
import './VoteInterface.scss';
import { get_pub_key } from './API'
import { get_voting_token } from './CommitInterface'
import { LOCAL_SERVER, STARK_SERVER } from './constants';
import { useState } from 'react';
import Timer from './Timer';
const axios = require('axios');

function callVote(result, pubKey, voting_token) {
  if (!result) {
    console.log("empty result")
    return 300;
  }
  axios({
    method: 'post',
    url: `${STARK_SERVER}/api/vote`,
    data: {
      vote: result,
      voting_token: voting_token,
      public_key: pubKey
    }
  }).then((response) => {
    console.log(response);
    if (response.status !== 200)
      console.log("ERROR");
  })
    .catch((error) => {
      console.log("catch ERROR");
    })
}

function ChoiceButton({ value, vote, setVote }) {
  let style = 'btn-grad';
  if (value === vote) style += ' selected-vote';
  return (
    <button
      className={style}
      onClick={() => setVote(value)}>
      {value}
    </button>);
}

function VoteInterface({ headerIndex, state }) {
  let voting_token = get_voting_token();
  let pubKey = get_pub_key();
  const [vote, setVote] = useState(null);

  if (!voting_token || !pubKey) {
    return <div>You did not register during the registration period. You need to wait for the next round to participate.</div>
  }

  return (
    <div className="container-layout">
      {/* <header className="App-header"> */}
      <div className={'title'}>{state.question}</div>
      {headerIndex === 5 &&
        <>
          <div className={'deux'}>
            <ChoiceButton value={'Yes'} vote={vote} setVote={setVote} />
            <ChoiceButton value={'No'} vote={vote} setVote={setVote} />
          </div>
          <button className={'btn-grad'} onClick={() => callVote(vote)}>Send vote</button>
          <button className={`${vote === null ? 'rekt' : 'btn-grad'} `} onClick={() => callVote(vote, pubKey, voting_token)}>
            {vote === null ? 'You voted!' : 'Send vote'}
          </button>
        </>
      }
      <Timer delayToCallback={25} />
      {/* </header> */}
    </div>
  );
}

export default VoteInterface;
