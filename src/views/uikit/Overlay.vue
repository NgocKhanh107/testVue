<script setup>
import ProductService from '@/service/ProductService';
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Test from './Test.vue';

const display = ref(false);
const displayConfirmation = ref(false);
const visibleLeft = ref(false);
const visibleRight = ref(false);
const visibleTop = ref(false);
const visibleBottom = ref(false);
const visibleFull = ref(false);
const products = ref(null);
const selectedProduct = ref(null);
const op = ref(null);
const op2 = ref(null);
const popup = ref(null);

const productService = new ProductService();
const toast = useToast();
const confirmPopup = useConfirm();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const toggle = (event) => {
    op.value.toggle(event);
};

const toggleDataTable = (event) => {
    op2.value.toggle(event);
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const onProductSelect = (event) => {
    op.value.hide();
    toast.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
};

const confirm = (event) => {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6">         
            <div class="card p-fluid">
                <h5>Overlay Panel</h5>
                <div class="flex flex-wrap gap-2">
                    <!-- <div>
                        <Button type="button" label="Image" @click="toggle" class="p-button-success" />
                       
                    </div> -->
                    <div>
                        <Button type="button" label="DataTable" @click="toggleDataTable" class="p-button-success" />
                        <OverlayPanel ref="op2" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px">
                            <Toast />
                           <Test />

                            <DataTable :value="products" v-model:selection="selectedProduct" selectionMode="single" :paginator="true" :rows="5" @row-select="onProductSelect" responsiveLayout="scroll">
                                <Column field="name" header="Name" :sortable="true" headerStyle="min-width:12rem;"></Column>
                                <Column header="Image" headerStyle="min-width:5rem;">
                                    <template #body="slotProps">
                                        <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
                                    </template>
                                </Column>
                                <Column field="price" header="Price" :sortable="true" headerStyle="min-width:8rem;">
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.price) }}
                                    </template>
                                </Column>
                            </DataTable>


                            <!-- <Dialog v-model:visible="voucherDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                                <div class="field">
                                    <label for="ten">Tên</label>
                                    <InputText id="ten" v-model.trim="voucher.ten" required="true"  />
                                    <small class="p-invalid" v-if="submitted && !voucher.ten">Tên không được để trống.</small>
                                </div>
                                <div class="field">
                                    <label for="thoiGianBatDau">Ngày Bắt Đầu</label>
                                    <Calendar id="thoiGianBatDau" v-model="voucher.thoiGianBatDau" dateFormat="yy/mm/dd" showIcon />
                                </div>
                                <div class="field">
                                    <label for="thoiGianKetThuc">Ngày Kết Thúc</label>
                                    <Calendar id="thoiGianKetThuc" v-model="voucher.thoiGianKetThuc" dateFormat="yy/mm/dd" showIcon />
                                </div>
                                <div class="field">
                                    <label for="moTa">Mô Tả</label>
                                    <InputText id="moTa" v-model.trim="voucher.moTa" required="true"  />
                        
                                </div>
                                
                                <div class="field">
                                        <label for="price">Giảm Tối Đa</label>
                                        <InputNumber id="price" v-model="voucher.giamToiDa" mode="currency" currency="USD" locale="en-US" :class="{ 'p-invalid': submitted && !voucher.giamToiDa}" :required="true" />
                                        <small class="p-invalid" v-if="submitted && !voucher.giamToiDa">Giảm tối đa không được để trống</small>
                                </div>
                            
                                <template #footer>
                                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                                    <Button type="submit" label="Save" icon="pi pi-check" class="p-button-text" @click="save" />
                                </template>
                        </Dialog> -->
                        </OverlayPanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
