<template>
  <a-col span="12">
    <a-card title="Patients Stats" class="common-card">
      <div class="list-group">
        <div class="list-group-item">
          <div class="img">
            <img src="../../assets/images/profile.jpg" alt="image" width="30" />
          </div>
          <div class="name">Jane Doe</div>
          <div class="progress-bar">
            <a-progress :percent="30" size="small" />
          </div>
        </div>
        <div class="list-group-item">
          <div class="img">
            <img src="../../assets/images/profile.jpg" alt="image" width="30" />
          </div>
          <div class="name">Jane Doe</div>
          <div class="progress-bar">
            <a-progress :percent="30" size="small" />
          </div>
        </div>
        <div class="list-group-item">
          <div class="img">
            <img src="../../assets/images/profile.jpg" alt="image" width="30" />
          </div>
          <div class="name">Jane Doe</div>
          <div class="progress-bar">
            <a-progress :percent="30" size="small" />
          </div>
        </div>
      </div>
    </a-card>
  </a-col>
</template>