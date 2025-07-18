import { PDFViewer } from '@react-pdf/renderer';
import React from 'react'

export const CreatePDF = () => {

  const Payments = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

  return (
    <div className='w-full h-[750px]'>
      <PDFViewer>
        <Payments />
      </PDFViewer>
    </div>
  )
}
