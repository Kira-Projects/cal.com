import { classNames } from "@calcom/lib";

import type { VerticalTabItemProps } from "./VerticalTabItem";
import VerticalTabItem from "./VerticalTabItem";

export { VerticalTabItem };

export interface NavTabProps {
  tabs: VerticalTabItemProps[];
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  linkShallow?: boolean;
  linkScroll?: boolean;
  itemClassname?: string;
  iconClassName?: string;
}

const NavTabs = function ({
  tabs,
  className = "",
  sticky,
  linkShallow,
  linkScroll,
  itemClassname,
  iconClassName,
  ...props
}: NavTabProps) {
  const filtered = tabs.filter(
    (tab) =>
      ![
        "/event-types/1151?tabName=recurring",
        "/event-types/1151?tabName=apps",
        "/event-types/1151?tabName=workflows",
        "/event-types/1151?tabName=webhooks",
      ].includes(tab.href)
  );

  return (
    <nav
      className={classNames(
        `no-scrollbar flex flex-col space-y-0.5 overflow-scroll ${className}`,
        sticky && "sticky top-0 -mt-7"
      )}
      style={{
        maxWidth: "256px",
      }}
      aria-label="Tabs"
      {...props}>
      {/* padding top for sticky */}
      {sticky && <div className="pt-6" />}
      {props.children}
      {filtered.map((tab, idx) => (
        <VerticalTabItem
          {...tab}
          key={idx}
          linkShallow={linkShallow}
          linkScroll={linkScroll}
          className={itemClassname}
          iconClassName={iconClassName}
        />
      ))}
    </nav>
  );
};

export default NavTabs;
