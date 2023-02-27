
export class ColorGenerator {

    public static newColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

}
