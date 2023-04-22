export class Vec3 extends Array {
	constructor([ x, y, z ] = [ 0, 0, 0 ]) {
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
	}
	get x() { return this[0]; }
	get y() { return this[1]; }
	get z() { return this[2]; }
	set x(val) { this[0] = val; }
	set y(val) { this[1] = val; }
	set z(val) { this[2] = val; }
	set([ x, y, z ]) {
		this[0] = x;
		this[1] = y;
		this[2] = z;
		return this;
	}
	sinCosRotX(sin, cos, dst = this) {
		const [ x, y, z ] = this;
		dst[0] = x;
		dst[1] = y*cos + z*sin;
		dst[2] = z*cos - y*sin;
		return dst;
	}
	sinCosRotY(sin, cos, dst = this) {
		const [ x, y, z ] = this;
		dst[0] = x*cos - z*sin;
		dst[1] = y;
		dst[2] = z*cos + x*sin;
		return dst;
	}
	sinCosRotZ(sin, cos, dst = this) {
		const [ x, y, z ] = this;
		dst[0] = x*cos + y*sin;
		dst[1] = y*cos - x*sin;
		dst[2] = z;
		return dst;
	}
	rotX(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotX(sin, cos, dst);
	}
	rotY(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotY(sin, cos, dst);
	}
	rotZ(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotZ(sin, cos, dst);
	}
	mulMat3(mat3, dst = this) {
		const [ x, y, z ] = this;
		const [ ix, iy, iz, jx, jy, jz, kx, ky, kz ] = mat3;
		dst[0] = x*ix + y*jx + z*kx;
		dst[1] = x*iy + y*jy + z*ky;
		dst[2] = x*iz + y*jz + z*kz;
		return dst;
	}
}

export class Mat3 extends Array {
	constructor([ ix, iy, iz, jx, jy, jz, kx, ky, kz ] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]) {
		super(9);
		this[0] = ix;
		this[1] = iy;
		this[2] = iz;
		this[3] = jx;
		this[4] = jy;
		this[5] = jz;
		this[6] = kx;
		this[7] = ky;
		this[8] = kz;
	}
	set([ ix, iy, iz, jx, jy, jz, kx, ky, kz ]) {
		this[0] = ix;
		this[1] = iy;
		this[2] = iz;
		this[3] = jx;
		this[4] = jy;
		this[5] = jz;
		this[6] = kx;
		this[7] = ky;
		this[8] = kz;
		return this;
	}
	setIdentity() {
		for (let i=0; i<9; ++i) {
			this[i] = ((i & 3) === 0)|0;
		}
		return this;
	}
	sinCosRotX(sin, cos, dst = this) {
		const [ ix, iy, iz, jx, jy, jz, kx, ky, kz ] = this;
		dst[0] = ix;
		dst[1] = iy*cos + iz*sin;
		dst[2] = iz*cos - iy*sin;
		dst[3] = jx;
		dst[4] = jy*cos + jz*sin;
		dst[5] = jz*cos - jy*sin;
		dst[6] = kx;
		dst[7] = ky*cos + kz*sin;
		dst[8] = kz*cos - ky*sin;
		return dst;
	}
	sinCosRotY(sin, cos, dst = this) {
		const [ ix, iy, iz, jx, jy, jz, kx, ky, kz ] = this;
		dst[0] = ix*cos - iz*sin;
		dst[1] = iy;
		dst[2] = iz*cos + ix*sin;
		dst[3] = jx*cos - jz*sin;
		dst[4] = jy;
		dst[5] = jz*cos + jx*sin;
		dst[6] = kx*cos - kz*sin;
		dst[7] = ky;
		dst[8] = kz*cos + kx*sin;
		return dst;
	}
	sinCosRotZ(sin, cos, dst = this) {
		const [ ix, iy, iz, jx, jy, jz, kx, ky, kz ] = this;
		dst[0] = ix*cos + iy*sin;
		dst[1] = iy*cos - ix*sin;
		dst[2] = iz;
		dst[3] = jx*cos + jy*sin;
		dst[4] = jy*cos - jx*sin;
		dst[5] = jz;
		dst[6] = kx*cos + ky*sin;
		dst[7] = ky*cos - kx*sin;
		dst[8] = kz;
		return dst;
	}
	rotX(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotX(sin, cos, dst);
	}
	rotY(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotY(sin, cos, dst);
	}
	rotZ(angle, dst = this) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		return this.sinCosRotZ(sin, cos, dst);
	}
	mulMat3(mat3, dst = this) {
		const [ aix, aiy, aiz, ajx, ajy, ajz, akx, aky, akz ] = this;
		const [ bix, biy, biz, bjx, bjy, bjz, bkx, bky, bkz ] = mat3;
		dst[0] = aix*bix + aiy*bjx + aiz*bkx;
		dst[1] = aix*biy + aiy*bjy + aiz*bky;
		dst[2] = aix*biz + aiy*bjz + aiz*bkz;
		dst[3] = ajx*bix + ajy*bjx + ajz*bkx;
		dst[4] = ajx*biy + ajy*bjy + ajz*bky;
		dst[5] = ajx*biz + ajy*bjz + ajz*bkz;
		dst[6] = akx*bix + aky*bjx + akz*bkx;
		dst[7] = akx*biy + aky*bjy + akz*bky;
		dst[8] = akx*biz + aky*bjz + akz*bkz;
		return dst;
	}
}
