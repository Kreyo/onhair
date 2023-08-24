function Menu({ changeFieldSize }) {
  return(
    <div className="menu">
      <div className="menu-item" onClick={() => changeFieldSize(25)}>5x5</div>
      <div className="menu-item" onClick={() => changeFieldSize(100)}>10x10</div>
      <div className="menu-item" onClick={() => changeFieldSize(400)}>20x20</div>
      <div className="menu-item" onClick={() => changeFieldSize(625)}>25x25</div>
    </div>
  )
}

export default Menu;