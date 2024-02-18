import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY = {
  none: 'none',
  length: 'length',
  abc: 'abc',
};

const getVisibleGoods = (goods, sort, isReversed) => {
  const visibleGoods = [...goods];

  switch (sort) {
    case SORT_BY.abc:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY.length:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(SORT_BY.none);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortBy, isReversed);

  const goodsList = visibleGoods.map(good => (
    <li data-cy="Good">{good}</li>
  ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY.abc,
          })}
          onClick={() => setSortBy(SORT_BY.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY.length,
          })}
          onClick={() => setSortBy(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SORT_BY.none || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SORT_BY.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList}
      </ul>
    </div>
  );
};
