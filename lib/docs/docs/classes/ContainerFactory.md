[rna-visualizer](../README.md) / ContainerFactory

# Class: ContainerFactory

Factory class for creating a DataContainer object that displays RNA visualization.

## Table of contents

### Constructors

- [constructor](ContainerFactory.md#constructor)

### Properties

- [basePairs](ContainerFactory.md#basepairs)
- [container](ContainerFactory.md#container)
- [data](ContainerFactory.md#data)
- [labels](ContainerFactory.md#labels)
- [margin](ContainerFactory.md#margin)
- [residues](ContainerFactory.md#residues)
- [styles](ContainerFactory.md#styles)

### Methods

- [addBasePairs](ContainerFactory.md#addbasepairs)
- [addClasses](ContainerFactory.md#addclasses)
- [addLabels](ContainerFactory.md#addlabels)
- [addMargin](ContainerFactory.md#addmargin)
- [addResidues](ContainerFactory.md#addresidues)
- [create](ContainerFactory.md#create)
- [setDimensions](ContainerFactory.md#setdimensions)

## Constructors

### constructor

• **new ContainerFactory**()

## Properties

### basePairs

• `Private` **basePairs**: [`BasePair`](BasePair.md)[] = `[]`

#### Defined in

[data/containerFactory.ts:27](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L27)

___

### container

• `Private` **container**: [`DataContainer`](DataContainer.md)

#### Defined in

[data/containerFactory.ts:23](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L23)

___

### data

• `Private` **data**: [`IRnaInput`](../interfaces/IRnaInput.md)

#### Defined in

[data/containerFactory.ts:24](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L24)

___

### labels

• `Private` **labels**: [`Label`](Label.md)[] = `[]`

#### Defined in

[data/containerFactory.ts:28](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L28)

___

### margin

• `Private` `Readonly` **margin**: ``10``

#### Defined in

[data/containerFactory.ts:22](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L22)

___

### residues

• `Private` **residues**: [`Residue`](Residue.md)[] = `[]`

#### Defined in

[data/containerFactory.ts:26](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L26)

___

### styles

• `Private` **styles**: `Styles`

#### Defined in

[data/containerFactory.ts:25](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L25)

## Methods

### addBasePairs

▸ `Private` **addBasePairs**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:82](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L82)

___

### addClasses

▸ `Private` **addClasses**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:74](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L74)

___

### addLabels

▸ `Private` **addLabels**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:114](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L114)

___

### addMargin

▸ `Private` **addMargin**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:48](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L48)

___

### addResidues

▸ `Private` **addResidues**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:105](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L105)

___

### create

▸ **create**(`data`, `styles`): [`DataContainer`](DataContainer.md)

Creates a DataContainer object for the RNA visualization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IRnaInput`](../interfaces/IRnaInput.md) | The RNA input data. |
| `styles` | `Styles` | The styles to apply to the visualization. |

#### Returns

[`DataContainer`](DataContainer.md)

A DataContainer object representing the IRnaInput data with given styles.

#### Defined in

[data/containerFactory.ts:36](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L36)

___

### setDimensions

▸ `Private` **setDimensions**(): `void`

#### Returns

`void`

#### Defined in

[data/containerFactory.ts:60](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/data/containerFactory.ts#L60)
