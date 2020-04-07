import React, { useState, useEffect } from 'react';


function ContextMenu(props: any) {

  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});


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
      default:  break;
    }
    // 设置点击后floatmenu隐藏
    if (visible) setVisible(false);
  }

  const hideMenu = () => {
    // 离开右键菜单时隐藏菜单
    if (visible) setVisible(false);
  }

  // 一级菜单
  const MenuItem = (items) => {
    return (
      <div style={{width:'160px',position:'relative'}}>
        <div className="contextMenu--option ia-menu-item" onClick={()=>onClick(items.mid)}>
          <span className="menu-action">{items.text}</span>
        </div>
      </div>
    )
  }

  return (visible || null) &&
    <div className="contextMenu ia-menu" style={style} onMouseLeave={hideMenu}>
      <MenuItem text={'删除'} mid={'deleteDom'}/>
    </div>
}

export default ContextMenu;