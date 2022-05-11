var m_w = 123456789
var m_z = 987654321
var mask = 0xffffffff

export const rng = {
  seed(i) {
    m_w = (123456789 + i) & mask
    m_z = (987654321 - i) & mask
  },
  float(): number {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0
    result /= 4294967296
    return result
  },
  int(n: number): number {
    return Math.ceil(this.float() * n)
  },
  mix(val: number): number {
    let dt = 0.9 + this.float() / 5
    return val / dt | 0
  }
}
