<script lang="ts">
  import { Button } from 'bits-ui'
  import { cn } from '$lib/utils'
  import { tv, type VariantProps } from 'tailwind-variants'

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  type Props = Button.Props & {
    variant?: Variant
    size?: Size
  }
  type $$Events = Button.Events
  type Variant = VariantProps<typeof buttonVariants>['variant']
  type Size = VariantProps<typeof buttonVariants>['size']

  let className: Props['class']
  export let variant: Props['variant'] = 'default'
  export let size: Props['size'] = 'default'
  export let builders: Props['builders'] = []
  export { className as class }

  const buttonVariants = tv({
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  })
</script>

<Button.Root
  {builders}
  class={// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  cn(buttonVariants({ variant, size, className }))}
  type="button"
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</Button.Root>
