// Page to test content

import { Grid } from '@/components/fancy-content/Grid'

export default function Page() {
  return (
    <div className="mx-auto w-fit">
      <div className="mt-12 p-3 pb-6 prose prose-p:text-gray-900">
        <p>Test</p>
        <p>
          <Grid
            data={[
              ['0', '1', '2,'],
              ['0', '1', '2'],
              ['0', '1  ', '2'],
            ]}
          />
        </p>
      </div>
    </div>
  )
}
