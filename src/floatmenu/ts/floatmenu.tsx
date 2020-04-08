import React, { useState, useEffect } from 'react';
import '../css/floatmenu.module.css'

function ContextMenu(props: any) {

  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState({});
  const [style, setStyle] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.addEventListener('contextmenu', _handleContextMenu);
    document.addEventListener('click', hideMenu);
    document.addEventListener('scroll', hideMenu);
    
    return () => {
      document.removeEventListener('contextmenu', _handleContextMenu);
      document.removeEventListener('click', hideMenu);
      document.removeEventListener('scroll', hideMenu);
    }
  })

  const _handleContextMenu = (event: any) => {
    // 阻止右击默认事件
    event.preventDefault();
    // 模拟点击聚焦此元素
    event.target.click();
    if(event.target.className == props.store.elClassName){
      // 设置菜单显示及坐标位置
      setVisible(true);
      const clickX = event.clientX;
      const clickY = event.clientY;
  
      setStyle({
        'top': clickY - 1 + 'px',
        'left': clickX - 1 + 'px',
        'borderWidth': '1px',
        'zIndex': 65535,
        'position':'absolute'
      })
    }
  };


  const onClick = (mid:any) => {
    switch(mid){
      case 'deleteDom': 
        //删除元素  
        var e = jQuery.Event("keydown");//模拟一个键盘事件
        e.keyCode = 8;
        e.which = 8;
        $(event.target).trigger(e);//模拟按下删除键
        break;
      case 'copyDom': break;
      case 'more': break;
      default:  break;
    }
    // 设置点击后floatmenu隐藏
    if (visible) setVisible(false);
  }

  const hideMenu = () => {
    // 离开右键菜单时隐藏主菜单
    if (visible) setVisible(false);
  }
  
  const showSubMenu = (index:any) => {
    setIndex(index);
  }
  const hideSubMenu = (index:any) => {
    setIndex(index);
  }

  // 可嵌套多级菜单
  const Menu = (items) => {
    return (
      <div style={{width:'160px',position:'relative'}}>
        <div className="contextMenu--option" onClick={()=>onClick(items.mid)} onMouseEnter={items.subMenu? ()=>showSubMenu(items.subMenuNum):null} onMouseLeave={items.subMenu? ()=>hideSubMenu(items.subMenuNum-1):null}>
          <span className="menu-action">{items.text}</span>
          {items.subMenu}
        </div>
      </div>
    )
  }

  return (visible || null) &&
    <div className="contextMenu" style={style} onMouseLeave={hideMenu}>
      <Menu text={'删除'} mid={'deleteDom'}/>
      <Menu text={'更多'} mid={'moreDom'} subMenuNum={2}
        subMenu={
          <div className={`subMenu contextMenu ${index >= 2 ? 'active' : '' }`}>
            <Menu text={'复制'} mid={'copyDom'}/>
            <Menu text={'更多'} mid={'pashDom'} subMenuNum={3}
              subMenu={
                <div className={`subMenu contextMenu ${index >= 3 ? 'active' : '' }`}>
                  <Menu text={'拷贝'} mid={'copyDom'}/>
                  <Menu text={'删除'} mid={'deleteDom'}/>
                </div>
            }/>
          </div>
      }/>
    </div>
}

export default ContextMenu;