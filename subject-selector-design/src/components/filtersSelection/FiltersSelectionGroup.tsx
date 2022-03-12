import React, { FC } from "react";
import { IFiltersSelection } from "../@interfaces";
import { CardButton } from "../cards/CardButton";

type HomePageVariant = "InitialState";

export interface FilterSelectionGroupProps {
  children?: string | React.ReactElement;
  className?: string;
  variant: HomePageVariant;
  disabled?: boolean;
  filters?: IFiltersSelection[];
  initialPosition: number;
  addLeftPos?: string;
  parentCallback?: (values: any) => void;
  bootstrap: boolean;
}

export const FilterSelectionGroup: FC<FilterSelectionGroupProps> = ({
  filters,
  initialPosition,
  addLeftPos,
  bootstrap,
}: FilterSelectionGroupProps) => {
  // const [fadeInFilters, setFadeInFilters] = useState(false);

  initialPosition = initialPosition || 0;

  const spacerHeights = [initialPosition, 78, 78];
  const spacerWidths = [64, 154, 8];

  let sum = initialPosition;
  const arrayFilters = filters && filters!.map((item, index) => {
    if (index === 0) {
      sum = spacerHeights[index];
    } else if (index === filters!.length - 1) {
      sum += spacerWidths[2] + spacerHeights[2];
    } else {
      sum += spacerWidths[2] + spacerHeights[2];
    }

    let boxNested = sum + spacerHeights[1];
    return {
      id: item.id,
      title: item.title,
      subTitle: item.subTitle,
      description: item.operation,
      addTopPos: sum,
      addLeftPos: addLeftPos,
      boxNested: boxNested,
    };
  });

  const middleSpacers = (posIndex: number, index: number, limit: number) => {
    if (index < limit - 1) {
      return (
        <div className="box-set">
          <figure
            className={"box-D2 D2-pos"}
            style={{ top: `${posIndex}px` }}
          ></figure>
        </div>
      );
    } else {
      return null;
    }
  };

  const deleteFilterSelection = (card: any) => {
    console.log("About to Delete this filter", card)
  };

  const removeFilter = (id: number, addLeftPos: number, addTopPos: number) => {
    return (
      <div
        // onMouseEnter={() => {
        //   setFadeInFilters(true);
        // }}
        // onMouseLeave={() => {
        //   setFadeInFilters(false);
        // }}
        key={`fadeIn_${id}`}
        className={`box-card delete-fade-in`} style={{ left: `${Number(addLeftPos) + 100}px`, top: `${Number(addTopPos) + 22}px` }}>
        <svg style={{ cursor: "pointer" }} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="m24 11-1.2 15.308c-.075.954-.946 1.692-1.996 1.692h-9.608c-1.05 0-1.92-.738-1.995-1.692L8 11h16zm-5-7c.552 0 1 .47 1 1.05V7h5a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h5V5.05c0-.58.448-1.05 1-1.05h6zm-1 2h-4v1h4V6z" fill="#DA291C" fillRule="evenodd" />
        </svg>
      </div>
    );
  }


  return (
    <div>
      {arrayFilters &&
        arrayFilters.map((filter, index) => {
          return (
            <div key={`boxFilter-${index}`}

            >
              <CardButton
                key={`buttFilter_${filter.id}`}
                title={filter.title}
                subTitle={filter.subTitle}
                description={filter.description}
                addClassNames={`box-card`}
                addTopPos={`${filter.addTopPos}px`}
                addLeftPos={bootstrap ? "" : `${filter.addLeftPos}px`}
                variant={"CardWithFilter"}
                onClick={() => {
                  deleteFilterSelection(filter);
                }}
              />
              {middleSpacers(
                filter.boxNested,
                index,
                filters!.length,
              )}
              {removeFilter(Number(filter.id), Number(filter.addLeftPos), Number(filter.addTopPos))}
              {/* {fadeInFilters && (
                <div key={`fadeIn_${filter.id}`}
                  className={`box-card`} style={{ left: `${Number(filter.addLeftPos) + 100}px`, top: `${Number(filter.addTopPos) + 22}px` }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m24 11-1.2 15.308c-.075.954-.946 1.692-1.996 1.692h-9.608c-1.05 0-1.92-.738-1.995-1.692L8 11h16zm-5-7c.552 0 1 .47 1 1.05V7h5a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h5V5.05c0-.58.448-1.05 1-1.05h6zm-1 2h-4v1h4V6z" fill="#DA291C" fillRule="evenodd" />
                  </svg>
                </div>
              )} */}
            </div>
          );

        })}


    </div >
  );
};
