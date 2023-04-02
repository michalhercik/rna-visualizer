/**
 * RNA visualization tool for displaying RNA secondary structures on a canvas element.
 */
export class RnaVis {
  /**
   * The canvas element to render the RNA secondary structures on.
   */
  public canvas: HTMLCanvasElement;

  /**
   * An array of data containers for each RNA secondary structure.
   */
  public readonly layers: Layer[];

  /**
   * The styles to use for rendering the RNA secondary structures.
   */
  private styles: Styles;

  /**
   * The zoom behavior for the canvas element.
   */
  private zoom: any;

  /**
   * Constructs a new RnaVis instance with the specified canvas element.
   * @param canvas The canvas element to render the RNA secondary structures on.
   */
  constructor(canvas: HTMLCanvasElement);

  /**
   * Adds zoom behavior to the canvas element.
   * @returns This RnaVis instance.
   */
  public addZoom(): RnaVis;

  /**
   * Renders the RNA secondary structures on the canvas element.
   */
  public draw(): void;

  /**
   * Draws the hover label for the specified coordinates.
   * @param x The x-coordinate of the mouse pointer.
   * @param y The y-coordinate of the mouse pointer.
   */
  public drawHoverLabel(x: number, y: number): void;

  /**
   * Adds a new data container for the RNA secondary structure with the specified input data.
   * @param data The input data for the RNA secondary structure.
   * @param name The name to use for the new layer.
   * @param visible Whether the new layer should be visible.
   */
  public addData(data: IRnaInput, name: string, visible?: boolean): void;

  /**
   * Clears all data containers and styles from the RnaVis instance.
   */
  public clear(): void;

  /**
   * Aligns the RNA secondary structures based on their sequence similarity.
   * @param groupIndex The index of the translation group to use for alignment.
   * @param minGroupSize The minimum size of a translation group.
   * @returns An array of translation vectors for each RNA secondary structure.
   */
  public align(groupIndex?: number, minGroupSize?: number): Vector2[];

  /**
   * Gets the translation vectors for aligning the RNA secondary structures to the specified temporary residue.
   * @param tempRes The temporary residue to align the RNA secondary structures to.
   * @returns An array of position records for each RNA secondary structure.
   */
  public getAlignmentToTempResidue(tempRes: Residue): PositionRecord[];

  /**
   * Gets the index of the layer with the specified name.
   * @param name The name of the layer.
   * @returns The index of the layer, or -1 if the layer was not found.
   */
  public getLayerIndex(name: string): number;

  /**
   * Translates each RNA secondary structure by the specified vectors.
   * @param translations An array of translation vectors for each RNA secondary structure.
   * @returns This RnaVis instance.
   * @throws An error if the length of the translations array does not match the number of RNA secondary structures.
   */
  public translate(translations: Vector2[]): RnaVis;

  /**
   * Gets the default alpha value for rendering the RNA secondary structures.
   * @returns The default alpha value.
   */
  public getDefaultAlpha(): number;

  /**
   * Set the global alpha value of the canvas context.
   * @param alpha - A number between 0 and 1 representing the opacity value.
   * @returns The RnaVis instance to allow for method chaining.
   */
  public setAlpha(alpha: number): RnaVis;

  /**
   * Set the visibility of a layer by its index.
   * @param index - The index of the layer to modify.
   * @param visibility - A boolean indicating whether the layer should be visible.
   * @returns The RnaVis instance to allow for method chaining.
   */
  public setVisibility(index: number, visibility: boolean): RnaVis;

  /**
   * Set the visibility of a layer by its name.
   * @param name - The name of the layer to modify.
   * @param visibility - A boolean indicating whether the layer should be visible.
   */
  public setVisibilityByName(name: string, visible: boolean): void;

  /**
   * Set the visibility of all layers.
   * @param visible - A boolean indicating whether all layers should be visible.
   * @returns The RnaVis instance to allow for method chaining.
   */
  public setAllVisibility(visible: boolean): RnaVis;

  /**
   * Set the visibility of all numbering labels.
   * @param visible - A boolean indicating whether all numbering labels should be visible.
   */
  public numberingLabelsVisibility(visible: boolean): void;

  /**
   * Reset the position of the canvas.
   */
  public resetPositions(): void;

  /**
   * Get an array of DataContainer instances representing the data for each layer.
   * @returns An array of DataContainer instances.
   */
  public getDataContainers(): Array<DataContainer>;
}
