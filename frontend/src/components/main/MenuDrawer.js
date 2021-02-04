/*import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Drawer, DrawerContent, DrawerHeader } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import Signout from '../signin_signout/Signout';
import User from './User';
import { StyledTextMenuBlack } from '../styles/StyledText';

const MenuDrawer = (props) => {
  const [open, setOpen] = React.useState(false);
  const { currentUserPermission } = props;
  return (
    <span>
      <StyledTextMenuBlack className="menu" onClick={() => setOpen(!open)}>
        Menu
      </StyledTextMenuBlack>
      <StyledDrawer dismissible open={open} onClose={() => setOpen(false)}>
        <DrawerContent>
          <List>
            <Link href="/">
              <ListItem>Home</ListItem>
            </Link>
            <Link href="/guides">
              <ListItem>MTB Guides</ListItem>
            </Link>
            {currentUserPermission === 'ADMIN' && (
              <Link href="/add_guide">
                <ListItem>Add Guide</ListItem>
              </Link>
            )}
          </List>
        </DrawerContent>
      </StyledDrawer>
    </span>
  );
};
const StyledDrawer = styled(Drawer)`
  white-space: nowrap;
  .mdc-drawer__content {
    height: 100%;
  }
  &&.MenuDrawer__StyledDrawer-sc-11lq4l1-0 {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }
  && .mdc-list {
    background-color: white;
  }
  //  && .mdc-drawer {
  //   width: 100%;
  // }
`;

export default MenuDrawer;
*/
