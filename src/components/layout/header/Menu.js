import React from "react";
import { Link } from "../../";
import * as styles from "./Menu.module.css";

const Menu = ({ items }) => (
  <nav className="flex flex-col justify-center w-inherit h-inherit fixed bg-accent text-shadow z-10">
    <ul>
      {items.map(({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            className={styles["menu-item"]}
            activeClassName={styles.active}
            partiallyActive={to !== "home"}
            children={label}
          />
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
