import { useEffect, useState } from "react";
import { useParams, history } from "ice";
import { List, Typography, Input, Tag, Row, Col } from "antd";
import { Column } from '@ant-design/plots';
import { ALGO, ALGO_CONFIG, RUNNER_CONFIG } from './config';
import { CHART_COLOR_COMMON, CHART_COLOR_PRIMARY } from "@/utils";

const { Text } = Typography;

export default () => {
    const params: any = useParams();
    const { algo } = params;
    const config = ALGO_CONFIG[algo];
    if (!ALGO.includes(algo)) {
        history?.push('/main/sort/bubble')
    }

    const [flags, setFlags] = useState<any>({});
    const [dataNumbers, setDataNumbers] = useState<any[]>([]);
    const [inputNumbers, setInputNumbers] = useState<string>('');
    const coloumnConfig = {
        data: dataNumbers,
        xField: 'xField',
        yField: 'yField',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        color: ({ xField }) => {
            if (xField === flags.i) {
                return CHART_COLOR_PRIMARY[0];
            } else if (xField === flags.j) {
                return CHART_COLOR_PRIMARY[1];
            }
            return CHART_COLOR_COMMON[0];
        },
        animation: false,
    };

    const onFlagChange = (flag) => {
        setFlags((flags: any) => ({
            ...flags,
            ...flag,
        }));
    };

    const handleSort = (v: number[]) => {
        setDataNumbers(v?.map((n: number, i: number) => ({
            xField: i,
            yField: n,
        })));
    };

    const onNumberChange = (v) => {
        setInputNumbers(v.target.value);
    };

    const onNumbersSearch = (v) => {
        setInputNumbers(v);
        const newValue = v?.split(',')?.map(v => Number(v));
        handleSort(newValue);
        config.run(newValue, handleSort, onFlagChange, RUNNER_CONFIG);
    };

    useEffect(() => {
        const initNumbers: number[] = [];
        for (let index = 0; index < 10; index++) {
            const newNumber: number = Math.round(Math.random() * 100);
            initNumbers.push(newNumber)
        }
        onNumbersSearch(initNumbers.join(','))
    }, [])

    return (
        <div>
            <Column {...coloumnConfig} />
            {Object.keys(flags)?.map((key: string, flagIndex: number) => (
                <Row
                    key={flagIndex}
                    style={{ margin: '10px 0 30px 30px', textAlign: 'center' }}
                >
                    {dataNumbers?.map((_data: any, dataIndex: number) => (
                        <Col
                            span={24 / dataNumbers.length}
                            key={dataIndex}
                            style={{ width: `calc(100% / ${dataNumbers.length}` }}
                        >
                            {flags[key] === dataIndex &&
                                <Text
                                    key={key}
                                    code
                                    style={{ width: 'max-content', display: 'block', textAlign: 'center', margin: 'auto' }}
                                >
                                    {key}({flags[key]})
                                </Text>
                            }
                        </Col>
                    ))}
                </Row>
            ))}
            <Input.Search
                enterButton="确定"
                value={inputNumbers}
                onChange={onNumberChange}
                onSearch={onNumbersSearch}
            />
            <List
                bordered
                header="示例代码"
                dataSource={config.code?.split('\n')}
                renderItem={(item: string) => (
                    <List.Item className="code">
                        <Typography.Text
                            style={{ paddingLeft: `${(item.match(/ /g)?.length || 0) * 2}px` }}
                        >
                            {item}
                        </Typography.Text>
                    </List.Item>
                )}
            />
        </div >
    )
}
