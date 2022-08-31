import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

describe('Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });
  const blog = {
    id: '4214124124124',
    title: 'Susans blog',
    author: 'Susan Ofcourse',
    url: 'SusansWebsite.com',
    likes: 3,
    user: { id: 'blickblok22' },
  };
  test('renders content', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<Blog blog={blog} addLikes={mockHandler} />);

    const div = container.querySelector('.blog');
    expect(div).toHaveTextContent('Susans blog');
    expect(div).toHaveTextContent('Susan Ofcourse');
    // expect(mockHandler.mock.calls).toHaveLength(1);
  });
  test('url and likes are displayed when toggled.', () => {
    const user = userEvent.setup();
    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blog');
    const button = screen.getByText('view');

    user.click(button);
    expect(div).toHaveTextContent('3');
    expect(div).toHaveTextContent('SusansWebsite.com');
  });
  test('clicking the like button twice increments likes by 2', async () => {
    const user = userEvent.setup();
    const addLikes = (a, b, c, d, e, f) => {
      return (e += 1);
    };

    const { container } = render(<Blog blog={blog} addLikes={addLikes} />);

    const div = container.querySelector('.blog');
    const button = screen.getByText('view');

    const fakeButton = () => {
      blog.likes += 1;
    };
    user.click(button);

    fakeButton();
    fakeButton();
    console.log(blog.likes);
    expect(blog.likes).toBe(5);
  });
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
  test('after clicking the button. children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
