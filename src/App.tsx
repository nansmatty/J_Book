import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';

const App = () => {
	const [input, setInput] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const ref = useRef<any>();

	useEffect(() => {
		startService();
	}, []);

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	const onClickHandler = async () => {
		if (!ref.current) {
			return;
		}
		const result = await ref.current.transform(input, {
			loader: 'jsx',
			target: 'es2015',
		});

		setCode(result.code);
	};

	return (
		<div>
			<textarea
				value={input}
				rows={10}
				cols={50}
				onChange={(e) => setInput(e.target.value)}>
				Hello World!
			</textarea>
			<div>
				<button onClick={onClickHandler}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

export default App;
