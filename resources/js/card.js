Nova.booting((Vue, router, store) => {
    Vue.component("filterable-modal", require("./components/FilterModal"));
    Vue.component("date-time-picker", require("./components/DateTimePicker"));
    Vue.component(
        "filterable-value-metric",
        require("./components/FilterableValueMetric")
    );
    Vue.component(
        "filterable-trend-metric",
        require("./components/FilterableTrendMetric")
    );
    Vue.component(
        "filterable-partition-metric",
        require("./components/FilterablePartitionMetric")
    );
});
