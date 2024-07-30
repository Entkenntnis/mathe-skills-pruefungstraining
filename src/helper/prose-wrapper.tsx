export function proseWrapper(children: JSX.Element) {
  return (
    <div className="prose prose-p:text-gray-900 [&_small]:text-gray-600">
      {children}
    </div>
  )
}
