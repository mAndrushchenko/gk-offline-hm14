import { fromEvent } from "rxjs"
import { map, switchMap } from "rxjs/operators"

export function onDrag(name: string, onPrev: Function, onNext: Function) {
  const element = document.getElementById(name)
  const mouseUp$ = fromEvent(element!, 'mouseup')
  const mouseDown$ = fromEvent(element!, 'mousedown')
  let start: number = 0
  let end: number = 0

  const onEnd = () => mouseUp$.pipe(
    map((event: any) => {
      end = event.clientX
    })
  )
  mouseDown$.pipe(
    map((event: any) => start = event.clientX),
    switchMap(onEnd)
  ).subscribe(() => {
    const dif = Math.abs(start - end)
    if (dif > 100) {
      if (start > end) {
        onNext()
      } else if (start < end) {
        onPrev()
      }
    }
  })
}


