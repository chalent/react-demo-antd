// 组件用于演示 useDeferredValue 的使用

import { useState, useDeferredValue, useEffect } from 'react';

function fetchResults(searchTerm: string) {
    // 模拟搜索结果
    return new Promise<Array<any>>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: `${searchTerm} Result 1` },
                { id: 2, name: `${searchTerm} Result 2` },
            ]);
        }, 500);
    });
}


export default function TabPost() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Array<any>>([]);

    // 使用 useDeferredValue 来延迟 searchTerm 的更新
    const deferredSearchTerm = useDeferredValue(searchTerm);  

    useEffect(() => {
        if (deferredSearchTerm) {
            // 模拟 API 请求
            fetchResults(deferredSearchTerm).then(res => setResults(res));
        }
    }, [deferredSearchTerm]);

    function handleChange(e: any) {
        setSearchTerm(e.target.value);
    }

    function SearchComponent(results: any ) {
        return (
            <ul>
                {results.map((result: any) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search..."
            />
            <SearchComponent results={results} />
        </div>
    );
}
