import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";

const PermataGuide = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>ATM Permata/ALTO</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih transaksi lainnya pada menu utama.</li>
            <li>2. Pilih pembayaran.</li>
            <li>3. Pilih pembayaran lainnya.</li>
            <li>4. Pilih virtual account.</li>
            <li>5. Masukkan nomor virtual account Permata, lalu konfirmasi.</li>
            <li>6. Pembayaran berhasil.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Via Bank Lainnya</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih bank & cara bayar (ATM/internet/mobile banking) yang Anda inginkan.</li>
            <li>2. Pilih transfer ke bank lain.</li>
            <li>3. Masukkan nomor virtual account.</li>
            <li>4. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>5. Pembayaran selesai.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default PermataGuide;
