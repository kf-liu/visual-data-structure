import { Link, Outlet, history } from 'ice';
import { Layout as AntLayout, Menu } from 'antd';
import About from '@/components/About';
import Logo from '@/components/Logo';
import styles from './layout.module.less';

const { Header, Footer, Sider, Content } = AntLayout;

export default function Layout() {
    const menuItem = [
        {
            key: '/main/sort',
            icon: '',
            label: '排序',
            children: [
                {
                    key: '/main/sort/bubble',
                    icon: '',
                    label: '冒泡',
                },
                // {
                //     key: '/main/sort/selection',
                //     icon: '',
                //     label: '选择',
                // },
            ],
        },
    ];

    const onMenuSelect = (e) => {
        history?.push(e.key)
    }

    return (
        <AntLayout>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className={styles.title}>
                    <Link to="/">
                        <Logo className={styles.title} />
                    </Link>
                </div>
                <Menu
                    mode="inline"
                    defaultOpenKeys={['/main/sort']}
                    items={menuItem}
                    onSelect={onMenuSelect}
                />
            </Sider>
            <AntLayout>
                {/* <Header>Header</Header> */}
                <Content className={styles.main} >
                    <Outlet />
                </Content>
                <Footer>
                    <About />
                </Footer>
            </AntLayout>
        </AntLayout>
    )
}