import sys

from starkware.crypto.signature.signature import (
    pedersen_hash, private_to_stark_key, private_key_to_ec_point_on_stark_curve, get_random_private_key, verify, inv_mod_curve_size, EC_GEN, ALPHA, FIELD_PRIME, EC_ORDER, sign)
from starkware.crypto.signature.math_utils import (
    ECPoint, div_mod, ec_add, ec_double, ec_mult, is_quad_residue, sqrt_mod)


def submit_key(private_key):
    # private_key = int(sys.argv[1])
    (r, s) = sign(msg_hash=private_key, priv_key=private_key)

    print(f'Key: {private_key}')
    print(f'Signature: {(r, s)}')
    return (private_key, r, s)
