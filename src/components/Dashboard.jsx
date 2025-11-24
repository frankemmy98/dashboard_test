import { useState } from "react";
import * as Icons from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dashboardData as initialData } from "../data/dashboardData";

const Dashboard = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColIndex = data.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = data.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceCol = data[sourceColIndex];
    const destCol = data[destColIndex];

    const draggedTask = sourceCol.cards[source.index];

    const newSourceCards = [...sourceCol.cards];
    newSourceCards.splice(source.index, 1);

    const newDestCards = [...destCol.cards];
    newDestCards.splice(destination.index, 0, draggedTask);

    const updated = [...data];
    updated[sourceColIndex] = { ...sourceCol, cards: newSourceCards };
    updated[destColIndex] = { ...destCol, cards: newDestCards };

    setData(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Parent container as CSS Grid */}
      <div className="p-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col space-y-4 rounded-3xl bg-brand1/5 p-3"
                style={{ minWidth: 0 }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3 rounded-full font-bold"
                  style={{ backgroundColor: section.bgColor }}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="py-1.5 px-3 bg-white text-sm rounded-full"
                      style={{ color: section.bgColor }}
                    >
                      {section.count}
                    </span>
                    <span className="text-white">{section.label}</span>
                  </div>
                  <Icons.Plus className="w-6 h-6 text-white" />
                </div>

                {/* Cards container */}
                <div className="flex flex-col gap-4">
                  {section.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={String(card.id)}
                      index={index}
                    >
                      {(provided) => {
                        const style = {
                          ...provided.draggableProps.style,
                          width: "100%", // fill column
                          minWidth: 0, // allow shrinking
                        };
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col space-y-3 border border-gray-200 dark:text-black rounded-3xl p-4 shadow-md bg-white cursor-move"
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

export default Dashboard;
