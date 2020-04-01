import React, { useState, useEffect } from 'react';
import '../css/ContentMenu.css';

function ContextMenu(props: any) {

  const [visible, setVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [style, setStyle] = useState({});
  const [index, setIndex] = useState(0);


  useEffect(() => {
    document.addEventListener('contextmenu', _handleContextMenu);
    document.addEventListener('click', _handleClick);
    document.addEventListener('scroll', _handleScroll);

    return () => {
      document.removeEventListener('contextmenu', _handleContextMenu);
      document.removeEventListener('click', _handleClick);
      document.removeEventListener('scroll', _handleScroll);
    }
  })

  const _handleContextMenu = (event: any) => {
    // 阻止右击默认事件
    event.preventDefault();
    // 设置菜单显示
    setVisible(true);
    const clickX = event.clientX;
    const clickY = event.clientY;

    setStyle({
      top: clickY + 5 + 'px',
      left: clickX + 5 + 'px'
    })
  };

  const _handleClick = (event: any) => {
    const wasOutside = !(event.target.contains === event.target.root);

    if (wasOutside && visible) setVisible(false);
    if (submenuVisible) setSubmenuVisible(false);
  };

  const _handleScroll = () => {
    if (visible) setVisible(false);
  };

  const mouseEnter = (event:any) => {
    setIndex(1);
  }

  const mouseLeave = (event:any) => {
    setIndex(0);
  }

  return (visible || null) &&
    <div className="contextMenu" style={style}>
      <div className="contextMenu--option" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        删除
        <div className={`submenuBox ${index === 1 ? 'active' : '' }`}>
          <div className="submenu">删除1</div>
          <div className="submenu">删除2</div>
          <div className="submenu">删除3</div>
        </div>
      </div>
      <div className="contextMenu--option">复制</div>
      <div className="contextMenu--option">粘贴</div>
      <div className="contextMenu--option contextMenu--option__disabled">不可选中</div>
      <div className="contextMenu--option">设置</div>
      <div className="contextMenu--separator" />
      <div className="contextMenu--option">关于</div>
    </div>

}

export default ContextMenu;