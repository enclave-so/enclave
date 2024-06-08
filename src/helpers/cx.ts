export default function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

// cx('base', undefined, ['more', 'classes'],
//   hasError && 'bg-red',
//   isEnabled || 'pointer-events-none',
//   isTitle ? 'font-semibold' : 'font-normal'
// )
// Result: "base more classes bg-red font-normal"

// clsx('base', undefined, ['more', 'classes'], {
//   'bg-red': hasError,
//   'pointer-events-none': !isEnabled,
//   'font-semibold': isTitle,
//   'font-normal': !isTitle,
// })

// Result: "base more classes bg-red font-normal"
