import octicons from '@primer/octicons';
import markdownIt from '../../src/lib/markdown-it';

const expectedOcticon = octicons['git-pull-request'].toSVG();

test('markdown-it-icons renders icon syntax correctly', () => {
  const source = ':fab-font-awesome: :glyphicon-home: :octicon-git-pull-request: :mit-task-alt:';

  const result = markdownIt.renderInline(source);
  const expected = [
    '<span aria-hidden="true" class="fab fa-font-awesome"></span>',
    '<span aria-hidden="true" class="glyphicon glyphicon-home"></span>',
    expectedOcticon,
    '<span aria-hidden="true" class="material-icons-two-tone align-middle">task_alt</span>',
  ].join(' ');

  expect(result).toEqual(expected);
});

test('markdown-it-icons renders icon syntax in multi-line source correctly', () => {
  const source = [
    'text with special characters: before icons',
    ':fab-font-awesome:',
    'text with special characters: between icons',
    ':glyphicon-home:',
    'more text with special characters: between icons',
    ':octicon-git-pull-request:',
    'even more text with special characters: between icons',
    ':mit-task-alt:',
    'text with special characters: after icons',
  ].join('\n');

  const result = markdownIt.renderInline(source);
  const expected = [
    'text with special characters: before icons',
    '<span aria-hidden="true" class="fab fa-font-awesome"></span>',
    'text with special characters: between icons',
    '<span aria-hidden="true" class="glyphicon glyphicon-home"></span>',
    'more text with special characters: between icons',
    expectedOcticon,
    'even more text with special characters: between icons',
    '<span aria-hidden="true" class="material-icons-two-tone align-middle">task_alt</span>',
    'text with special characters: after icons',
  ].join('\n');

  expect(result).toEqual(expected);
});
