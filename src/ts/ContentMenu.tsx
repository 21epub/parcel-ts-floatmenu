import * as React from 'react';
import { Menu, Dropdown } from 'antd';
const { SubMenu } = Menu;
import '../css/ContentMenu.css';

function ContextMenu(props: any) {


  const clickDom = (index:any) => {
    console.log(index);
    console.log('复制')
  }



  // 菜单dom结构
  const menu = (
    <Menu>
      <Menu.Item key='1' disabled>删除（禁止选中）</Menu.Item>
      <Menu.Item onClick={()=>clickDom(123)}>复制</Menu.Item>
      <Menu.Divider/>
      <SubMenu title="设置">
        <Menu.Item>删除</Menu.Item>
        <Menu.Item>复制</Menu.Item>
      </SubMenu>
      <SubMenu title="关于我们">
        <Menu.Item>官网</Menu.Item>
        <Menu.Item>作品</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return true &&
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div
        className="site-dropdown-context-menu"
        style={{
          textAlign: 'center',
          height: 200,
          lineHeight: '200px',
        }}
      >
        Right Click on here
    </div>
    </Dropdown>
}



export default ContextMenu;