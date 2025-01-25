import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";

const BcaGuide = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>ATM BCA</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih transaksi lainnya pada menu utama.</li>
            <li>2. Pilih transfer.</li>
            <li>3. Pilih ke rekening BCA virtual account.</li>
            <li>4. Masukkan nomor BCA virtual account.</li>
            <li>5. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>6. Pembayaran berhasil.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Klik BCA</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih Transfer Dana.</li>
            <li>2. Pilih Transfer ke BCA virtual account.</li>
            <li>3. Masukkan nomor BCA virtual account.</li>
            <li>4. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>5. Pembayaran berhasil.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>m-BCA</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih m-Transfer.</li>
            <li>2. Pilih BCA virtual account.</li>
            <li>3. Masukkan nomor BCA virtual account.</li>
            <li>4. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>5. Konfirmasi pembayaran.</li>
            <li>6. Pembayaran berhasil.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default BcaGuide;
