import React, {useRef} from 'react';
import {SORT_TYPES, SortTypes} from '../../utils/const';
import {setSortType} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {State} from '../../types/store';

function SortOffers() {

  const dispatch = useAppDispatch();
  const {sortType} = useAppSelector((state: State) => state);

  const sortListRef = useRef<HTMLUListElement | null>(null);

  const handleSortToggle = (evt: any) => {
    if (evt.target.classList.contains('places__sorting-type')) {
      if (sortListRef.current) {
        sortListRef.current.classList.toggle('places__options--opened');
      }
    }
  };

  const handleSortType = (evt: any) => {
    dispatch(setSortType(evt.target.dataset.sort));
    if (sortListRef.current) {
      sortListRef.current.classList.toggle('places__options--opened');
    }
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleSortToggle}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        &nbsp; {SORT_TYPES[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul ref={sortListRef} className="places__options places__options--custom">
        <li className="places__option places__option--active" tabIndex={0} data-sort={SortTypes.Popular}
          onClick={handleSortType}
        >Popular
        </li>
        <li className="places__option" tabIndex={0} data-sort={SortTypes.PriceLow} onClick={handleSortType}>Price: low
          to
          high
        </li>
        <li className="places__option" tabIndex={0} data-sort={SortTypes.PriceHigh} onClick={handleSortType}>Price: high
          to low
        </li>
        <li className="places__option" tabIndex={0} data-sort={SortTypes.TopRated} onClick={handleSortType}>Top rated
          first
        </li>
      </ul>
    </form>
  );
}

export default SortOffers;
