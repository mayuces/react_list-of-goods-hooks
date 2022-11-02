import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, sortTypeSetter] = useState(SortType.NONE);
  const [isReversed, isReversedSetter] = useState(false);

  const reverseHandler = () => {
    isReversedSetter(prevState => !prevState);
  };

  const alphabeticSorter = () => {
    sortTypeSetter(SortType.ALPABET);
  };

  const lengthSorter = () => {
    sortTypeSetter(SortType.LENGTH);
  };

  const resetHandler = () => {
    sortTypeSetter(SortType.NONE);
    isReversedSetter(false);
  };

  const newGoods = getReorderedGoods(goodsFromServer,
    { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPABET && 'is-light'}`}
          onClick={alphabeticSorter}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={lengthSorter}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reverseHandler}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetHandler}
            >
              Reset
            </button>
          )
          : ''}

      </div>

      <ul>
        <ul>
          {newGoods.map(good => {
            return (
              <div>
                <div
                  data-cy="Good"
                  key={good}
                  className="box column is-info is-rounded mb-3"
                >
                  {good}
                </div>
              </div>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
