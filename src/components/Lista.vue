<template>
        <div class="scroll" style="width: 100%">
            <div class="layout-padding">
                <div class="row" style="margin-top: 30px;">
                    <q-data-table :data="dataTableData" :config="config" :columns="columns" @refresh="refresh">

                    </q-data-table>
                </div>
            </div>
        </div>
</template>

<script>
import {
  QDataTable,
  QField,
  QInput,
  QCheckbox,
  QSelect,
  QSlider,
  QBtn,
  QIcon,
  QTooltip,
  QCollapsible,
  clone
} from 'quasar'

import db from '@/datasource.js'
export default {
  components: {
    QDataTable,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QIcon,
    QTooltip,
    QCollapsible
  },
    firebase: {
      dataTableData: db.ref('usuarios')
    },
    sockets:{
        connect: function(){
            console.log('socket connected')
        },
        info: function(data){
            console.log('sockets: info',data)
            //This is where I should get the current selected item if exists
            this.dataTableData = data;
            //This is where I should restore the selected item
        }
    },
    methods: {
        getInfo: function(val){
        },
        refresh (done) {
        }
    },
    created: function(){
    },
    data: function () {
        return {
            dataTableData: [],
            config: {
                title: 'My Data Table',
                refresh: true,
                columnPicker: false,
                leftStickyColumns: 0,
                rightStickyColumns: 0,
                rowHeight: '50px',
                responsive: true,
                selection: 'single',
                messages: {
                    noData: '<i>warning</i> No data available to show.'
                }
            },
            columns: [
                { label: 'Name', field: 'name', width: '200px', sort: true },
                { label: 'Size', field: 'size', width: '50px', sort: true },
                { label: 'Status', field: 'status', width: '50px', sort: true },
                { label: 'Progress', field: 'progress', width: '150px', sort: false },
                { label: 'Speed', field: 'speed', width: '50px', sort: false },
                { label: 'ETA', field: 'eta', width: '50px', sort: false }
            ],
            pagination: false,
            rowHeight: 50,
            bodyHeightProp: 'auto',
            bodyHeight: 'auto'
        }
    },
    watch: {
    }
}
</script>