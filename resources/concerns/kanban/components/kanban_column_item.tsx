import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import type { KanbanTask } from '../types/kanban_task'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { IconCalendar, IconMessageCircle2, IconPaperclip, IconPencil } from '@tabler/icons-react'
import Button from '@/components/button'
import { useToggle } from '@/hooks/use_toggle'
import { EditTask } from './form/edit_kanban_task'

export function ColumnItem(props: KanbanTask & { index: number }) {
  const { id, title, description, index, columnId } = props
  const [enableEditing, onEnableEditing] = useToggle(false)

  return (
    <>
      {enableEditing ? (
        <EditTask columnId={columnId} taskId={id} title={title} onClose={onEnableEditing} />
      ) : (
        <Draggable draggableId={id.toString()} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              role="button"
            >
              <Card className="relative group">
                <Button
                  onClick={onEnableEditing}
                  variant="ghost"
                  className="hidden group-hover:block absolute top-1 right-1 rounded-full"
                >
                  <IconPencil className="size-4" />
                </Button>
                <CardHeader className="p-4 border-none space-y-1">
                  <CardTitle className="text-sm">{title}</CardTitle>
                  <CardDescription className="text-xs">{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 border-none text-xs text-secondary-foreground font-medium">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span>Progress</span>
                      <span>4/10</span>
                    </div>
                    <div className="h-0.5 w-full bg-secondary ">
                      <div className="bg-orange-500 w-1/2 h-full transition-all duration-300"></div>
                    </div>
                    <div className="flex"></div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="flex items-center gap-x-2 text-muted-foreground text-xs">
                      <IconMessageCircle2 className="stroke-muted-foreground size-3" />
                      <span>12</span>
                    </span>
                    <span className="flex items-center gap-x-2 text-muted-foreground text-xs">
                      <IconPaperclip className="stroke-muted-foreground size-3" />
                      <span>12</span>
                    </span>
                    <span className="flex items-center gap-x-1 text-muted-foreground text-xs">
                      <IconCalendar className="stroke-muted-foreground size-3" />
                      <span>Nov</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Draggable>
      )}
    </>
  )
}
