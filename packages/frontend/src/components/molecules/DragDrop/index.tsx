import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const DragDrop = () => {
    const initialItems = [
        { id: '1', content: '指定シフト5' },
        { id: '2', content: '指定シフト5' },
        { id: '3', content: '31' },
    ];

    const [draggedItems, setDraggedItems] = React.useState(initialItems);

    const onDragEnd = (result: DropResult) => {
        console.log('Drag result:', result); // Log kết quả kéo

        // Kiểm tra nếu không có đích đến
        if (!result.destination) {
            return; // Không làm gì cả
        }

        // Tạo một bản sao của danh sách items
        const updatedItems = Array.from(draggedItems);

        // Lấy phần tử đã kéo ra và loại bỏ khỏi danh sách
        const [movedItem] = updatedItems.splice(result.source.index, 1);

        // Thêm phần tử đã kéo vào vị trí đích
        updatedItems.splice(result.destination.index, 0, movedItem);

        // Cập nhật trạng thái với danh sách mới
        setDraggedItems(updatedItems);
        console.log('Updated items:', updatedItems); // Log danh sách đã cập nhật
    };

    return (
        <td colSpan={17} className="tdhako">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            className="w-full relative flex"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {draggedItems.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`w-[90px] h-[19px] rounded-[10px] ${index === 0 ? 'bg-[#FDAF3B]' : index === 1 ? 'bg-[#f25050]' : 'bg-[#bfeaff]'}`}
                                            style={{ margin: '0 10px' }} // Thêm khoảng cách giữa các phần tử
                                        >
                                            <span className="absolute top-[1px] left-[6px] text-[11px] pl-[2px] font-bold">
                                                {item.content}
                                            </span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder} {/* Giữ chỗ cho draggable khi đang di chuyển */}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </td>
    );
};

export default DragDrop;
