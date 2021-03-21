import React from "react";
import Link from "../Link";
import * as styles from "./Menu.module.css";

export default ({ items }) => (
  <nav className="w-full h-full flex flex-col justify-center text-shadow">
    <ul>
      {items.map(({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            className={styles.item}
            activeClassName={styles.active}
            partiallyActive={to !== "home"}
            children={label}
          />
        </li>
      ))}
    </ul>
  </nav>
)
