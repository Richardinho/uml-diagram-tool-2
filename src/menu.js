export const createMenu = (handleCommand) => {
  const menu = [
    {
      label: "create",
      children: [
        { label: "type box", command: "create-type-box" },
        {
          label: "connector",
          children: [
            { label: "horizontal", command: "create-horizontal-connector" },
            { label: "vertical", command: "create-vertical-connector" },
          ],
        },
      ],
    },
    { label: "delete diagram", command: "delete-diagram" },
    { label: "showJSON" },
    { label: 'export', command: 'export'},
  ];

  const menuEl = document.getElementById("menu");
  menuEl.addEventListener("click", (event) => {
    const command = event.target.dataset["command"];
    if (command) {
      handleCommand(command);
    }
  });


  function createMenuItems(parentEl, menuItems) {
    menuItems.forEach((item) => {
      const menuEl = document.createElement("li");
      parentEl.appendChild(menuEl);
      menuEl.textContent = item.label;

      if (item.command) {
        menuEl.dataset.command = item.command;
      }
      if (item.children) {
        const subMenuEl = document.createElement("ul");
        menuEl.appendChild(subMenuEl);
        createMenuItems(subMenuEl, item.children);
      }
    });
  }

  createMenuItems(menuEl, menu);
};
