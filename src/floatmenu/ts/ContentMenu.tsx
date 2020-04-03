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
    // 阻止点击穿透
    event.stopPropagation();
    console.log(event);
    if(event.target.className == 'paragraph_opvqF4'){
      // 设置菜单显示
      setVisible(true);
      const clickX = event.clientX;
      const clickY = event.clientY;
  
      setStyle({
        top: clickY + 5 + 'px',
        left: clickX + 5 + 'px'
      })
    }
  };


  const _handleClick = (event: any) => {
    const wasOutside = !(event.target.contains === event.target.root);

    if (wasOutside && visible) setVisible(false);
    if (submenuVisible) setSubmenuVisible(false);
  };

  const _handleScroll = () => {
    if (visible) setVisible(false);
  };

  const mouseEnter = (index:any) => {
    setIndex(index);
  }

  const mouseLeave = (event:any) => {
    setIndex(0);
  }

  return (visible || null) &&
    <div className="contextMenu" style={style}>
      <div className="contextMenu--option" onMouseEnter={()=>mouseEnter(1)} onMouseLeave={mouseLeave}>
        删除
        <div className={`submenuBox ${index === 1 ? 'active' : '' }`}>
          <div className="submenu">删除1</div>
          <div className="submenu">删除2</div>
          <div className="submenu">删除3</div>
        </div>
      </div>
      <div className="contextMenu--option" onMouseEnter={()=>mouseEnter(2)} onMouseLeave={mouseLeave}>
        复制
        <div className={`submenuBox ${index === 2 ? 'active' : '' }`}>
          <div className="submenu">复制1</div>
          <div className="submenu">复制2</div>
          <div className="submenu">复制3</div>
        </div>
      </div>
      <div className="contextMenu--option" onMouseEnter={()=>mouseEnter(3)} onMouseLeave={mouseLeave}>
        粘贴
        <div className={`submenuBox ${index === 3 ? 'active' : '' }`}>
          <div className="submenu">粘贴1</div>
          <div className="submenu">粘贴2</div>
          <div className="submenu">粘贴3</div>
        </div>
      </div>
      <div className="contextMenu--option contextMenu--option__disabled">不可选中</div>
      <div className="contextMenu--option" onMouseEnter={()=>mouseEnter(4)} onMouseLeave={mouseLeave}>
        设置
        <div className={`submenuBox ${index === 4 ? 'active' : '' }`}>
          <div className="submenu">设置1</div>
          <div className="submenu">设置2</div>
          <div className="submenu">设置3</div>
        </div>
      </div>
      <div className="contextMenu--separator" />
      <div className="contextMenu--option" onMouseEnter={()=>mouseEnter(5)} onMouseLeave={mouseLeave}>
        关于
        <div className={`submenuBox ${index === 5 ? 'active' : '' }`}>
          <div className="submenu">关于1</div>
          <div className="submenu">关于2</div>
          <div className="submenu">关于3</div>
        </div>
      </div>
    </div>

}

export default ContextMenu;