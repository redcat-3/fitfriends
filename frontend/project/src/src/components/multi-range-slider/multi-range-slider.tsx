import { useCallback, useEffect, useState, useRef } from "react";
import "./style.css";
import React from "react";

type MultiRangeSliderProps = {
  min: number,
  max: number,
  withValue?: boolean,
  minMax?: boolean,
  onChange: ({min, max}: {min: number, max: number}) => void
};

const MultiRangeSlider = ({ min, max, withValue, minMax, onChange }: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <React.Fragment>
      {withValue &&
        <div className="filter-price filter-calories">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              name="text-min"
              value={minVal}
              min={min}
              max={max}
              onChange={(evt) => {
                if(+evt.target.value > maxVal) {
                  setMinVal(maxVal);
                } else if(+evt.target.value < min) {
                  setMinVal(min);
                } else {
                  setMinVal(+evt.target.value);
                }
              }}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              name="text-max"
              value={maxVal}
              min={min}
              max={max}
              onChange={(evt) => {
                if(+evt.target.value < minVal) {
                  setMaxVal(minVal);
                } else if(+evt.target.value > max) {
                  setMaxVal(max);                
                } else {
                  setMaxVal(+evt.target.value);
                }
              }}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
      }
      <div className="filter-range">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-5"
        />  
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />
        <div className="slider filter-range__scale">
          <div className="slider filter-range__bar">
            <div className="slider__track "/>
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">{minVal}</div>
            <div className="slider__right-value">{maxVal}</div>
          </div>          
        </div>
        <div className="filter-raiting__control">
          <span className="visually-hidden">Минимальное значение</span>
          {minMax && <span>{minVal}</span>}
          <span className="visually-hidden">Максимальное значение</span>
          {minMax && <span>{maxVal}</span>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MultiRangeSlider;