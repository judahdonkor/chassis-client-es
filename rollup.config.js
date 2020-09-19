import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json';

const extensions = ['.ts']

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es' // the preferred format
        }
    ],
    external: [
        /@babel\/runtime/,
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        nodeResolve({
            extensions
        }),
        babel({
            babelHelpers: 'runtime',
            extensions
        }),
        terser()
    ]
};