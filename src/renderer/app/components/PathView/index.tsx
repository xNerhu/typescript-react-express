import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledPathView, Container, Item, Input } from './style';

const onItemClick = (index: number) => (e: React.MouseEvent) => {
  e.stopPropagation();
  store.pages.current.path.goto(index);
}

const onKeyDown = (e: React.KeyboardEvent) => {
  const input = store.pathView.inputRef.current;

  if (e.key === 'Enter') {
    const page = store.pages.current;

    page.path.push(input.value.trim());
    store.pathView.inputVisible = false;
  } else if (e.key === 'Escape') {
    store.pathView.inputVisible = false;
  }
};

const onBlur = () => {
  store.pathView.inputVisible = false;
}

const onContextMenu = () => {
  store.contextMenu.show('path');
}

export const PathView = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPathView onContextMenu={onContextMenu}>
      <Container visible={!store.pathView.inputVisible} onClick={store.pathView.show}>
        {page.path.items.map((label, index) => (
          <Item key={label} onClick={onItemClick(index)}>{label}</Item>
        ))}
      </Container>
      <Input
        ref={store.pathView.inputRef}
        type="text"
        visible={store.pathView.inputVisible}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onMouseDown={e => e.stopPropagation()}
      />
    </StyledPathView>
  );
});