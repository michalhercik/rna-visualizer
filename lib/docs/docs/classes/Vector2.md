[rna-visualizer](../README.md) / Vector2

# Class: Vector2

Two-dimensional vector.

## Table of contents

### Constructors

- [constructor](Vector2.md#constructor)

### Properties

- [x](Vector2.md#x)
- [y](Vector2.md#y)
- [zero](Vector2.md#zero)

### Methods

- [add](Vector2.md#add)
- [copy](Vector2.md#copy)
- [multiply](Vector2.md#multiply)
- [size](Vector2.md#size)
- [subtract](Vector2.md#subtract)
- [distance](Vector2.md#distance)
- [subtraction](Vector2.md#subtraction)
- [sum](Vector2.md#sum)

## Constructors

### constructor

• **new Vector2**(`x`, `y`)

Creates a new Vector2 instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x component of the vector. |
| `y` | `number` | The y component of the vector. |

#### Defined in

[components/vector.ts:25](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L25)

## Properties

### x

• **x**: `number`

The x component of the vector.

#### Defined in

[components/vector.ts:8](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L8)

___

### y

• **y**: `number`

The y component of the vector.

#### Defined in

[components/vector.ts:13](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L13)

___

### zero

▪ `Static` `Readonly` **zero**: [`Vector2`](Vector2.md)

The zero vector.

#### Defined in

[components/vector.ts:18](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L18)

## Methods

### add

▸ **add**(`vector`): [`Vector2`](Vector2.md)

Adds the given vector to this vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The vector to add. |

#### Returns

[`Vector2`](Vector2.md)

The sum of this vector and the given vector.

#### Defined in

[components/vector.ts:35](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L35)

___

### copy

▸ **copy**(): [`Vector2`](Vector2.md)

Returns a copy of this vector.

#### Returns

[`Vector2`](Vector2.md)

A copy of this vector.

#### Defined in

[components/vector.ts:77](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L77)

___

### multiply

▸ **multiply**(`k`): [`Vector2`](Vector2.md)

Multiplies this vector by the given scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `k` | `number` | The scalar to multiply by. |

#### Returns

[`Vector2`](Vector2.md)

This vector multiplied by the given scalar.

#### Defined in

[components/vector.ts:57](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L57)

___

### size

▸ **size**(): `number`

Returns the size (magnitude) of this vector.

#### Returns

`number`

The size of this vector.

#### Defined in

[components/vector.ts:67](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L67)

___

### subtract

▸ **subtract**(`vector`): [`Vector2`](Vector2.md)

Subtracts the given vector from this vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The vector to subtract. |

#### Returns

[`Vector2`](Vector2.md)

The difference between this vector and the given vector.

#### Defined in

[components/vector.ts:46](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L46)

___

### distance

▸ `Static` **distance**(`vector1`, `vector2`): `number`

Returns the distance between the given vectors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector1` | [`Vector2`](Vector2.md) | The first vector. |
| `vector2` | [`Vector2`](Vector2.md) | The second vector. |

#### Returns

`number`

The distance between the given vectors.

#### Defined in

[components/vector.ts:107](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L107)

___

### subtraction

▸ `Static` **subtraction**(`vector1`, `vector2`): [`Vector2`](Vector2.md)

Returns the difference between the given vectors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector1` | [`Vector2`](Vector2.md) | The first vector. |
| `vector2` | [`Vector2`](Vector2.md) | The second vector. |

#### Returns

[`Vector2`](Vector2.md)

The difference between the given vectors.

#### Defined in

[components/vector.ts:97](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L97)

___

### sum

▸ `Static` **sum**(`vector1`, `vector2`): [`Vector2`](Vector2.md)

Returns the sum of the given vectors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector1` | [`Vector2`](Vector2.md) | The first vector. |
| `vector2` | [`Vector2`](Vector2.md) | The second vector. |

#### Returns

[`Vector2`](Vector2.md)

The sum of the given vectors.

#### Defined in

[components/vector.ts:87](https://github.com/michalhercik/rna-visualizer/blob/f928c9f/lib/src/components/vector.ts#L87)
