"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const DrawerContext = React.createContext<{
  direction?: "bottom" | "left" | "right" | "top"
}>({})

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerContext.Provider value={{ direction: props.direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  </DrawerContext.Provider>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 h-screen flex w-screen xs:w-auto",
          (!direction || direction === 'bottom') && "inset-x-0 bottom-0 mt-24 rounded-t-[10px]",
          direction === 'left' && 'top-0 left-0 p-3',
          direction === 'right' && 'top-0 right-0 p-3',
          direction === 'top' && 'top-0  p-3',
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

// const DrawerHeader = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
//     {...props}
//   />
// )
// DrawerHeader.displayName = "DrawerHeader"

// const DrawerFooter = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn("mt-auto flex flex-col gap-2 p-4", className)}
//     {...props}
//   />
// )
// DrawerFooter.displayName = "DrawerFooter"

// const DrawerTitle = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <DrawerPrimitive.Title
//     ref={ref}
//     className={cn(
//       "text-lg font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ))
// DrawerTitle.displayName = DrawerPrimitive.Title.displayName

// const DrawerDescription = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <DrawerPrimitive.Description
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ))
// DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer, DrawerClose,
  DrawerContent, DrawerOverlay, DrawerPortal, DrawerTrigger
}

