const navbar = () => {
    return ` <nav>
    <div class="left">
      <i class="bx bx-menu"></i>
      <a href="./index.html">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png?20200820120939"
          alt="YouTube"
      /></a>
    </div>
    <div class="search">
      <input
        type="text"
        id="search"
        autocomplete="off"
        placeholder="Search"
      />
      <i class="bx bx-search"></i>
      <i class="bx bxs-microphone"></i>
    </div>
    <div class="right">
      <i class="bx bx-video-plus"></i>
      <i class="bx bxs-grid"></i>
      <i class="bx bx-bell"></i>
      <i class="bx bxs-user-circle"></i>
    </div>
  </nav>`
}

export default navbar;