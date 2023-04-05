[rna-visualizer](../README.md) / [Exports](../modules.md) / BasePair

# Class: BasePair

Represents a base pair.

**`Implements`**

## Implements

- [`ILine`](../interfaces/ILine.md)

## Table of contents

### Constructors

- [constructor](BasePair.md#constructor)

### Properties

- [classes](BasePair.md#classes)
- [residue1](BasePair.md#residue1)
- [residue2](BasePair.md#residue2)
- [transform](BasePair.md#transform)

### Methods

- [getClasses](BasePair.md#getclasses)
- [getTransformedX1](BasePair.md#gettransformedx1)
- [getTransformedX2](BasePair.md#gettransformedx2)
- [getTransformedY1](BasePair.md#gettransformedy1)
- [getTransformedY2](BasePair.md#gettransformedy2)
- [getX1](BasePair.md#getx1)
- [getX2](BasePair.md#getx2)
- [getY1](BasePair.md#gety1)
- [getY2](BasePair.md#gety2)
- [isVisible](BasePair.md#isvisible)
- [setTransform](BasePair.md#settransform)

## Constructors

### constructor

• **new BasePair**(`residue1`, `residue2`, `classes`)

Creates a new instance of BasePair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `residue1` | [`Residue`](Residue.md) | The first residue of the base pair. |
| `residue2` | [`Residue`](Residue.md) | The second residue of the base pair. |
| `classes` | `string`[] | The classes associated with the base pair. |

#### Defined in

[components/basePair.ts:24](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L24)

## Properties

### classes

• `Private` **classes**: `string`[]

#### Defined in

[components/basePair.ts:16](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L16)

___

### residue1

• `Private` **residue1**: [`Residue`](Residue.md)

#### Defined in

[components/basePair.ts:13](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L13)

___

### residue2

• `Private` **residue2**: [`Residue`](Residue.md)

#### Defined in

[components/basePair.ts:14](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L14)

___

### transform

• `Private` **transform**: [`Transformation`](../interfaces/Transformation.md) = `identity`

#### Defined in

[components/basePair.ts:15](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L15)

## Methods

### getClasses

▸ **getClasses**(): `string`[]

Gets the classes associated with the base pair.

#### Returns

`string`[]

The classes associated with the base pair.

#### Implementation of

[ILine](../interfaces/ILine.md).[getClasses](../interfaces/ILine.md#getclasses)

#### Defined in

[components/basePair.ts:116](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L116)

___

### getTransformedX1

▸ **getTransformedX1**(): `number`

Gets the x coordinate of the first residue after transformation.

#### Returns

`number`

The x coordinate of the first residue after transformation.

#### Implementation of

[ILine](../interfaces/ILine.md).[getTransformedX1](../interfaces/ILine.md#gettransformedx1)

#### Defined in

[components/basePair.ts:44](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L44)

___

### getTransformedX2

▸ **getTransformedX2**(): `number`

Gets the x coordinate of the second residue after transformation.

#### Returns

`number`

The x coordinate of the second residue after transformation.

#### Implementation of

[ILine](../interfaces/ILine.md).[getTransformedX2](../interfaces/ILine.md#gettransformedx2)

#### Defined in

[components/basePair.ts:60](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L60)

___

### getTransformedY1

▸ **getTransformedY1**(): `number`

Gets the y coordinate of the first residue after transformation.

#### Returns

`number`

The y coordinate of the first residue after transformation.

#### Implementation of

[ILine](../interfaces/ILine.md).[getTransformedY1](../interfaces/ILine.md#gettransformedy1)

#### Defined in

[components/basePair.ts:52](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L52)

___

### getTransformedY2

▸ **getTransformedY2**(): `number`

Gets the y coordinate of the second residue after transformation.

#### Returns

`number`

The y coordinate of the second residue after transformation.

#### Implementation of

[ILine](../interfaces/ILine.md).[getTransformedY2](../interfaces/ILine.md#gettransformedy2)

#### Defined in

[components/basePair.ts:68](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L68)

___

### getX1

▸ **getX1**(): `number`

Gets the x coordinate of the first residue.

#### Returns

`number`

The x coordinate of the first residue.

#### Implementation of

[ILine](../interfaces/ILine.md).[getX1](../interfaces/ILine.md#getx1)

#### Defined in

[components/basePair.ts:76](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L76)

___

### getX2

▸ **getX2**(): `number`

Gets the x coordinate of the second residue.

#### Returns

`number`

The x coordinate of the second residue.

#### Implementation of

[ILine](../interfaces/ILine.md).[getX2](../interfaces/ILine.md#getx2)

#### Defined in

[components/basePair.ts:92](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L92)

___

### getY1

▸ **getY1**(): `number`

Gets the y coordinate of the first residue.

#### Returns

`number`

The y coordinate of the first residue.

#### Implementation of

[ILine](../interfaces/ILine.md).[getY1](../interfaces/ILine.md#gety1)

#### Defined in

[components/basePair.ts:84](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L84)

___

### getY2

▸ **getY2**(): `number`

Gets the y coordinate of the second residue.

#### Returns

`number`

The y coordinate of the second residue.

#### Implementation of

[ILine](../interfaces/ILine.md).[getY2](../interfaces/ILine.md#gety2)

#### Defined in

[components/basePair.ts:100](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L100)

___

### isVisible

▸ **isVisible**(): `boolean`

Determines whether the base pair is visible.

#### Returns

`boolean`

Whether the base pair is visible.

#### Implementation of

[ILine](../interfaces/ILine.md).[isVisible](../interfaces/ILine.md#isvisible)

#### Defined in

[components/basePair.ts:108](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L108)

___

### setTransform

▸ **setTransform**(`transform`): [`BasePair`](BasePair.md)

Sets the transformation to be applied to the base pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | [`Transformation`](../interfaces/Transformation.md) | The transformation to apply to the base pair. |

#### Returns

[`BasePair`](BasePair.md)

The BasePair instance for method chaining.

#### Defined in

[components/basePair.ts:35](https://github.com/michalhercik/rna-visualizer/blob/7600d7b/lib/src/components/basePair.ts#L35)
