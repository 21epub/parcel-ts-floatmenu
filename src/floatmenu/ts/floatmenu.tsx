import React, { useState, useEffect } from 'react';
import '../css/floatmenu.css';



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

    if(event.target.className == 'paragraph_opvqF4' || event.target.className == 'linkblock_qBUos4'){
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


  const onDelete = () => {
    var e = jQuery.Event("keydown");//模拟一个键盘事件
    e.keyCode = 8;//keyCode=8是back，46是delete
    e.which = 8;
    $(".linkblock_qBUos4").trigger(e);//模拟按下删除键
    if (visible) setVisible(false);
  }

  const hideMenu = () => {
    // 离开右键菜单时隐藏菜单
    if (visible) setVisible(false);
  }


  return (visible || null) &&
    <div className="contextMenu ia-menu" style={style} onMouseLeave={hideMenu}>
      <div style={{width:'160px'}}>
        <div className="contextMenu--option ia-menu-item" onClick={()=>onDelete()}>
          <span className="menu-action">删除</span>
        </div>
      </div>
    </div>
}

export default ContextMenu;