export const mode: string;
export namespace entry {
    const index: string;
}
export const devtool: string;
export namespace devServer {
    const _static: string;
    export { _static as static };
}
export namespace output {
    const filename: string;
    const path: string;
    const clean: boolean;
    const globalObject: string;
    const libraryTarget: string;
    const library: string;
    const umdNamedDefine: boolean;
}
export namespace optimization {
    const runtimeChunk: string;
}
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
        exclude: RegExp;
    }[];
}
export namespace resolve {
    const extensions: string[];
}
