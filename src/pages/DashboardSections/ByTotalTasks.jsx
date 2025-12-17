import { useState, useMemo } from "react";
import * as Icons from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dashboardData as initialData } from "../../data/dashboardData";

const ByTotalTasks = () => {
  const [data, setData] = useState(
    initialData.map((col) => ({ ...col, count: col.cards.length }))
  );

  // Live total count
  const totalColumnCount = useMemo(
    () => data.reduce((sum, col) => sum + col.cards.length, 0),
    [data]
  );

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const colIndex = data.findIndex((col) => col.id === source.droppableId);
      const col = data[colIndex];
      const updatedCards = Array.from(col.cards);
      const [movedCard] = updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, movedCard);

      const newData = [...data];
      newData[colIndex] = {
        ...col,
        cards: updatedCards,
        count: updatedCards.length,
      };
      setData(newData);
      return;
    }

    const sourceColIndex = data.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = data.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceCol = data[sourceColIndex];
    const destCol = data[destColIndex];

    const sourceCards = Array.from(sourceCol.cards);
    const destCards = Array.from(destCol.cards);

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    const updated = [...data];
    updated[sourceColIndex] = {
      ...sourceCol,
      cards: sourceCards,
      count: sourceCards.length,
    };
    updated[destColIndex] = {
      ...destCol,
      cards: destCards,
      count: destCards.length,
    };

    setData(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="py-10 px-6 grid gap-5 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-start justify-center">
        {data.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col space-y-4 dark:text-black rounded-3xl bg-brand1/5 p-3 w-full mx-auto"
              >
                <div
                  className="flex items-center justify-between p-3 rounded-full font-bold"
                  style={{ backgroundColor: col.bgColor }}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="py-1.5 px-3 bg-white text-sm rounded-full"
                      style={{ color: col.bgColor }}
                    >
                      {col.count}
                    </span>
                    <span className="text-white">{col.label}</span>
                  </div>
                  <Icons.Plus className="w-6 h-6 text-white" />
                </div>

                <div className="flex flex-col gap-4">
                  {col.cards.map((card, index) => (
                    <Draggable
                      key={`${col.id}-${card.id}`}
                      draggableId={`${col.id}-${card.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        const style = {
                          ...provided.draggableProps.style,
                        };

                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col space-y-3 border border-gray-200 rounded-3xl p-4 shadow-md bg-white cursor-move"
                            style={style}
                          >
                            <span
                              className="bg-brand1/10 font-bold rounded-full px-3 py-1 text-xs max-w-fit"
                              style={{ color: card.labelColor }}
                            >
                              {card.label}
                            </span>
                            <h3 className="text-lg font-bold">{card.title}</h3>
                            <p className="text-gray-600">{card.p}</p>

                            <div className="flex justify-between items-center">
                              <div className="flex -space-x-3">
                                {card.profileImg.map((imgObj, i) => (
                                  <img
                                    key={i}
                                    src={Object.values(imgObj)[0]}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full border border-white"
                                  />
                                ))}
                              </div>

                              <div className="flex gap-4 text-sm mt-2">
                                <span className="flex items-center gap-1 font-bold">
                                  <Icons.MessageCircleMore className="fill-gray-400 stroke-gray-200" />
                                  {card.comments}
                                </span>
                                <span className="flex items-center gap-1 font-bold">
                                  <Icons.CircleCheck className="stroke-gray-200 fill-gray-400" />
                                  {card.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ByTotalTasks;
