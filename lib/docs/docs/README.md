rna-visualizer

# rna-visualizer

## Table of contents

### Classes

- [BasePair](classes/BasePair.md)
- [Circle](classes/Circle.md)
- [ContainerFactory](classes/ContainerFactory.md)
- [DataContainer](classes/DataContainer.md)
- [DoubleCoorTarget](classes/DoubleCoorTarget.md)
- [Label](classes/Label.md)
- [Layer](classes/Layer.md)
- [Line](classes/Line.md)
- [MappingLine](classes/MappingLine.md)
- [PositionRecord](classes/PositionRecord.md)
- [Rectangle](classes/Rectangle.md)
- [Residue](classes/Residue.md)
- [RnaVis](classes/RnaVis.md)
- [SingleCoorTarget](classes/SingleCoorTarget.md)
- [Text](classes/Text.md)
- [Title](classes/Title.md)
- [TranslationAnim](classes/TranslationAnim.md)
- [TranslationGroup](classes/TranslationGroup.md)
- [TranslationGroups](classes/TranslationGroups.md)
- [Vector2](classes/Vector2.md)
- [VisibilityAnim](classes/VisibilityAnim.md)
- [VisibilityRecord](classes/VisibilityRecord.md)

### Interfaces

- [IAnimation](interfaces/IAnimation.md)
- [IDataBasePair](interfaces/IDataBasePair.md)
- [IDataLabel](interfaces/IDataLabel.md)
- [IDataLabelContent](interfaces/IDataLabelContent.md)
- [IDataLabelLine](interfaces/IDataLabelLine.md)
- [IDataResidue](interfaces/IDataResidue.md)
- [IDataStyle](interfaces/IDataStyle.md)
- [ILine](interfaces/ILine.md)
- [IRnaComplexes](interfaces/IRnaComplexes.md)
- [IRnaInput](interfaces/IRnaInput.md)
- [IRnaMolecules](interfaces/IRnaMolecules.md)
- [Transformation](interfaces/Transformation.md)

### Type Aliases

- [AfterFn](README.md#afterfn)

### Variables

- [identity](README.md#identity)

## Type Aliases

### AfterFn

Ƭ **AfterFn**: () => `void`

#### Type declaration

▸ (): `void`

A type of function that is invoked after an animation completes.

##### Returns

`void`

#### Defined in

[animations/iAnimation.ts:6](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/animations/iAnimation.ts#L6)

## Variables

### identity

• `Const` **identity**: [`Transformation`](interfaces/Transformation.md)

Identity transformation object that does not modify its inputs.

#### Defined in

[components/transformation.ts:25](https://github.com/michalhercik/rna-visualizer/blob/476cd69/lib/src/components/transformation.ts#L25)
